import "./bootstrap";
import "./dark";
// Load Leaflet globally
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Make Leaflet globally available
window.L = L;

// Use the 'alpine:init' event to register your component
document.addEventListener("alpine:init", () => {
    Alpine.data(
        "locationPicker",
        (initialLat = 24.7136, initialLng = 46.6753) => ({
            map: null,
            marker: null,
            mapReady: false,
            currentLat: initialLat,
            currentLng: initialLng,
            gettingLocation: false,
            locationError: null,
            showLocationInfo: false,

            get googleMapsUrl() {
                return this.currentLat && this.currentLng
                    ? `https://www.google.com/maps/@${this.currentLat},${this.currentLng},15z`
                    : "";
            },

            get formattedCoords() {
                return this.currentLat && this.currentLng
                    ? `${this.currentLat.toFixed(4)}, ${this.currentLng.toFixed(
                          4
                      )}`
                    : "";
            },

            init() {
                this.$nextTick(() => {
                    this.initMap();
                });
            },

            initMap() {
                const mapContainer = this.$refs.mapContainer;

                if (this.map) {
                    this.map.remove();
                    this.map = null;
                }

                try {
                    this.map = L.map(mapContainer).setView(
                        [this.currentLat, this.currentLng],
                        13
                    );

                    L.tileLayer(
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        {
                            maxZoom: 19,
                            attribution: "© OpenStreetMap contributors",
                        }
                    ).addTo(this.map);

                    this.marker = L.marker([this.currentLat, this.currentLng], {
                        draggable: true,
                    }).addTo(this.map);

                    this.marker.on("dragend", (e) => {
                        const pos = e.target.getLatLng();
                        this.updateLocation(pos.lat, pos.lng);
                    });

                    this.map.on("click", (e) => {
                        this.marker.setLatLng([e.latlng.lat, e.latlng.lng]);
                        this.updateLocation(e.latlng.lat, e.latlng.lng);
                    });

                    this.mapReady = true;

                    setTimeout(() => this.map.invalidateSize(), 100);
                } catch (error) {
                    console.error("Map initialization error:", error);
                }
            },

            updateLocation(lat, lng) {
                this.currentLat = parseFloat(lat.toFixed(7));
                this.currentLng = parseFloat(lng.toFixed(7));
                this.locationError = null;
                this.$wire.call(
                    "updateLocation",
                    this.currentLat,
                    this.currentLng
                );
            },

            getCurrentLocation() {
                if (!navigator.geolocation) {
                    this.showLocationError(
                        "Geolocation is not supported by this browser"
                    );
                    return;
                }
                if (
                    location.protocol !== "https:" &&
                    location.hostname !== "localhost" &&
                    location.hostname !== "127.0.0.1"
                ) {
                    this.showLocationError(
                        "Geolocation requires HTTPS connection"
                    );
                    return;
                }
                this.gettingLocation = true;
                this.locationError = null;
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error("TIMEOUT")), 10000);
                });
                const geolocationPromise = new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 300000,
                    });
                });
                Promise.race([geolocationPromise, timeoutPromise])
                    .then((position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        this.map.setView([lat, lng], 15);
                        this.marker.setLatLng([lat, lng]);
                        this.updateLocation(lat, lng);
                        this.gettingLocation = false;
                        this.showLocationInfo = true;
                        setTimeout(() => (this.showLocationInfo = false), 3000);
                    })
                    .catch((error) => {
                        this.gettingLocation = false;
                        this.handleGeolocationError(error);
                    });
            },

            handleGeolocationError(error) {
                let errorMessage = "";
                if (error.message === "TIMEOUT") {
                    errorMessage =
                        "Location request timed out. Please try again or select manually.";
                } else {
                    switch (error.code) {
                        case 1:
                            errorMessage =
                                "Location access denied. Please enable location permissions and try again.";
                            break;
                        case 2:
                            errorMessage =
                                "Location unavailable. Please check your GPS/location services and try again.";
                            break;
                        case 3:
                            errorMessage =
                                "Location request timed out. Please try again.";
                            break;
                        default:
                            errorMessage =
                                "Unable to get your location. Please select manually on the map.";
                    }
                }
                this.showLocationError(errorMessage);
            },

            showLocationError(message) {
                this.locationError = message;
                setTimeout(() => (this.locationError = null), 5000);
            },

            async tryIPLocation() {
                try {
                    this.gettingLocation = true;
                    const response = await fetch("https://ipapi.co/json/");
                    const data = await response.json();
                    if (data.latitude && data.longitude) {
                        const lat = parseFloat(data.latitude);
                        const lng = parseFloat(data.longitude);
                        this.map.setView([lat, lng], 13);
                        this.marker.setLatLng([lat, lng]);
                        this.updateLocation(lat, lng);
                        this.showLocationInfo = true;
                        setTimeout(() => (this.showLocationInfo = false), 3000);
                    } else {
                        throw new Error("No location data from IP service");
                    }
                } catch (error) {
                    this.showLocationError(
                        "Could not determine location from IP address"
                    );
                } finally {
                    this.gettingLocation = false;
                }
            },

            destroy() {
                if (this.map) {
                    this.map.remove();
                    this.map = null;
                }
            },
        })
    );
});

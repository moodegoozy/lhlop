<?php

use Illuminate\Support\Facades\Route;
use App\Http\Livewire\HomePage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/login', function () {
    return view('layouts.minimal');
})->name('login');

Route::get('/register', function () {
    return view('layouts.minimal');
})->name('register');

Route::get('/about', function () {
    return 'About Page';
})->name('about');

Route::get('/contact', function () {
    return 'Contact Page';
})->name('contact');

Route::get('/teacher/register', function () {
    return 'Teacher Registration';
})->name('teacher.register');

Route::get('/settings/language/{locale}', function ($locale) {
    session(['locale' => $locale]);
    app()->setLocale($locale);
    return back();
})->name('settings.language');

Route::post('/logout', function () {
    auth()->logout();
    return redirect('/');
})->name('logout');

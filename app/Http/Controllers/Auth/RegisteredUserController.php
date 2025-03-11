<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', Rule::enum(UserRole::class)],
            'organization_name' => 'required|string|max:255',
            'organization_address' => 'required|string|max:255',
            'organization_city' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'verified' => false,
        ]);

        if ($request->role === UserRole::SPPG->value) {
            $sppg = Supplier::create([
                'name' => $request->organization_name,
                'address' => $request->organization_address,
                'city' => $request->organization_city,
                'user_id' => $user->id,
            ]);
        } elseif ($request->role === UserRole::KEPALA_SEKOLAH->value) {
            $school = School::create([
                'name' => $request->organization_name,
                'address' => $request->organization_address,
                'city' => $request->organization_city,
                'user_id' => $user->id
            ]);
        }

        event(new Registered($user));

        // Auth::login($user);

        return redirect(route('login', absolute: false));
    }
}

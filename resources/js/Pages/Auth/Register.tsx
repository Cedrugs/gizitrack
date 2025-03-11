import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        organization_name: '',
        organization_address: '',
        organization_city: '',
    });

    const roles = [
        {value: '', label: 'Select your role', disabled: true},
        {value: 'sppg', label: 'Satuan Pelayanan Pemenuhan Gizi (SPPG)'},
        {value: 'kepala_sekolah', label: 'Kepala Sekolah'}
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) => {
                            setData('role', e.target.value);
                            setData('organization_name', '');
                            setData('organization_address', '');
                        }}
                        required
                    >
                        {roles.map((role) => (
                            <option key={role.value} value={role.value} disabled={role.disabled}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {data.role != "" && (
                    <>
                        <div className="mt-4">
                            <InputLabel htmlFor="organization_name" value={`Nama ${data.role === 'sppg' ? 'SPPG' : 'Sekolah'}`} />
                            <TextInput
                                id="organization_name"
                                name="organization_name"
                                value={data.organization_name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('organization_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.organization_name} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="organization_city" value={`Kota ${data.role === 'sppg' ? 'SPPG' : 'Sekolah'}`} />
                            <TextInput
                                id="organization_city"
                                name="organization_city"
                                value={data.organization_city}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('organization_city', e.target.value)}
                                required
                            />
                            <InputError message={errors.organization_city} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="organization_address" value={`Alamat ${data.role === 'sppg' ? 'SPPG' : 'Sekolah'}`} />
                            <TextInput
                                id="organization_address"
                                name="organization_address"
                                value={data.organization_address}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('organization_address', e.target.value)}
                                required
                            />
                            <InputError message={errors.organization_address} className="mt-2" />
                        </div>
                    </>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

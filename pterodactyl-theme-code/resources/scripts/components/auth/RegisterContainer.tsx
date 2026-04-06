import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { object, string, ref } from 'yup';
import tw from 'twin.macro';
import Field from '@/components/elements/Field';
import Button from '@/components/elements/Button';
import GlassTheme from '@/components/elements/GlassTheme';
import { UserPlus, Key, User, Mail, ShieldCheck } from 'lucide-react';

export default () => {
    const [isSubmitting, setSubmitting] = useState(false);

    const submit = (values: any) => {
        setSubmitting(true);
        // Mock register logic
        setTimeout(() => {
            setSubmitting(false);
            window.location.href = '/auth/login';
        }, 1000);
    };

    return (
        <div css={tw`min-h-screen flex items-center justify-center relative`}>
            <GlassTheme />
            <div css={tw`w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl relative z-10 my-8`}>
                <div css={tw`text-center mb-8`}>
                    <div css={tw`w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30`}>
                        <UserPlus css={tw`text-green-400`} size={32} />
                    </div>
                    <h2 css={tw`text-3xl font-bold text-white tracking-tight`}>Create Account</h2>
                    <p css={tw`text-neutral-400 mt-2`}>Join us to start hosting your servers</p>
                </div>

                <Formik
                    onSubmit={submit}
                    initialValues={{ email: '', username: '', password: '', password_confirmation: '' }}
                    validationSchema={object().shape({
                        email: string().email('Must be a valid email.').required('Email is required.'),
                        username: string().required('Username is required.').min(4, 'Username must be at least 4 characters.'),
                        password: string().required('Password is required.').min(8, 'Password must be at least 8 characters.'),
                        password_confirmation: string().oneOf([ref('password'), null], 'Passwords must match.').required('Password confirmation is required.'),
                    })}
                >
                    {({ isSubmitting }) => (
                        <Form css={tw`space-y-6`}>
                            <div css={tw`space-y-4`}>
                                <div css={tw`relative`}>
                                    <div css={tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                        <Mail css={tw`text-neutral-400`} size={18} />
                                    </div>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        css={tw`w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                                <div css={tw`relative`}>
                                    <div css={tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                        <User css={tw`text-neutral-400`} size={18} />
                                    </div>
                                    <Field
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        css={tw`w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                                <div css={tw`relative`}>
                                    <div css={tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                        <Key css={tw`text-neutral-400`} size={18} />
                                    </div>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        css={tw`w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                                <div css={tw`relative`}>
                                    <div css={tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                        <ShieldCheck css={tw`text-neutral-400`} size={18} />
                                    </div>
                                    <Field
                                        name="password_confirmation"
                                        type="password"
                                        placeholder="Confirm Password"
                                        css={tw`w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                css={tw`w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(22,163,74,0.4)] transition-all`}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </Button>

                            <div css={tw`text-center mt-6 text-neutral-400 text-sm`}>
                                Already have an account? <a href="/auth/login" css={tw`text-green-400 hover:text-green-300 font-medium`}>Sign in</a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

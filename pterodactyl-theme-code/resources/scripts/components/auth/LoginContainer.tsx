import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import tw from 'twin.macro';
import Field from '@/components/elements/Field';
import Button from '@/components/elements/Button';
import GlassTheme from '@/components/elements/GlassTheme';
import { LogIn, Key, User, Mail } from 'lucide-react';

export default () => {
    const [isSubmitting, setSubmitting] = useState(false);

    const submit = (values: any) => {
        setSubmitting(true);
        // Mock login logic
        setTimeout(() => {
            setSubmitting(false);
            window.location.href = '/';
        }, 1000);
    };

    return (
        <div css={tw`min-h-screen flex items-center justify-center relative`}>
            <GlassTheme />
            <div css={tw`w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl relative z-10`}>
                <div css={tw`text-center mb-8`}>
                    <div css={tw`w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30`}>
                        <LogIn css={tw`text-blue-400`} size={32} />
                    </div>
                    <h2 css={tw`text-3xl font-bold text-white tracking-tight`}>Welcome Back</h2>
                    <p css={tw`text-neutral-400 mt-2`}>Sign in to manage your servers</p>
                </div>

                <Formik
                    onSubmit={submit}
                    initialValues={{ username: '', password: '' }}
                    validationSchema={object().shape({
                        username: string().required('Username or Email is required.'),
                        password: string().required('Password is required.'),
                    })}
                >
                    {({ isSubmitting }) => (
                        <Form css={tw`space-y-6`}>
                            <div css={tw`space-y-4`}>
                                <div css={tw`relative`}>
                                    <div css={tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                        <User css={tw`text-neutral-400`} size={18} />
                                    </div>
                                    <Field
                                        name="username"
                                        type="text"
                                        placeholder="Username or Email"
                                        css={tw`w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
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
                                        css={tw`w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                            </div>

                            <div css={tw`flex items-center justify-between text-sm`}>
                                <label css={tw`flex items-center text-neutral-300 cursor-pointer`}>
                                    <input type="checkbox" css={tw`mr-2 rounded bg-black/50 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0`} />
                                    Remember me
                                </label>
                                <a href="/auth/password" css={tw`text-blue-400 hover:text-blue-300 transition-colors`}>
                                    Forgot password?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                css={tw`w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all`}
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>

                            <div css={tw`text-center mt-6 text-neutral-400 text-sm`}>
                                Don't have an account? <a href="/auth/register" css={tw`text-blue-400 hover:text-blue-300 font-medium`}>Register here</a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

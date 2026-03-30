import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import useFlash from '@/plugins/useFlash';
import http from '@/api/http';
import PageContentBlock from '@/components/elements/PageContentBlock';
import GlassTheme from '@/components/elements/GlassTheme';
import Field from '@/components/elements/Field';
import Button from '@/components/elements/Button';
import tw from 'twin.macro';
import { Palette, MessageSquare, Save } from 'lucide-react';

interface Values {
    panelName: string;
    primaryColor: string;
    secondaryColor: string;
    sidebarColor: string;
    discordSuspendChannel: string;
    discordRenewalChannel: string;
    discordRenewalDays: number;
}

export default () => {
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const [initialValues, setInitialValues] = useState<Values>({ 
        panelName: 'SKA HOST',
        primaryColor: '#3b82f6',
        secondaryColor: '#1e40af',
        sidebarColor: '#111827',
        discordSuspendChannel: '',
        discordRenewalChannel: '',
        discordRenewalDays: 7,
    });

    useEffect(() => {
        clearFlashes();
        // Fetch current settings from your custom API endpoint
        http.get('/api/admin/theme-settings')
            .then(({ data }) => setInitialValues({ 
                panelName: data.panel_name || 'SKA HOST',
                primaryColor: data.primary_color || '#3b82f6',
                secondaryColor: data.secondary_color || '#1e40af',
                sidebarColor: data.sidebar_color || '#111827',
                discordSuspendChannel: data.discord_suspend_channel || '',
                discordRenewalChannel: data.discord_renewal_channel || '',
                discordRenewalDays: data.discord_renewal_days || 7,
            }))
            .catch(error => clearAndAddHttpError({ key: 'admin:theme', error }));
    }, []);

    const submit = (values: Values, { setSubmitting }: any) => {
        clearFlashes();
        http.post('/api/admin/theme-settings', values)
            .then(() => {
                setInitialValues(values);
                // Optionally reload or show success flash
            })
            .catch(error => clearAndAddHttpError({ key: 'admin:theme', error }))
            .then(() => setSubmitting(false));
    };

    return (
        <PageContentBlock title={'Theme Settings'} showFlashKey={'admin:theme'}>
            <GlassTheme />
            <div css={tw`w-full flex flex-col`}>
                <h2 css={tw`text-2xl font-bold mb-4 text-neutral-100 flex items-center gap-2`}>
                    <Palette size={24} /> Theme & Integrations
                </h2>
                <div css={tw`bg-neutral-800 p-6 rounded shadow-md w-full max-w-3xl`}>
                    <Formik
                        onSubmit={submit}
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={object().shape({
                            panelName: string().required('A panel name is required.').max(191),
                            primaryColor: string().required(),
                            secondaryColor: string().required(),
                            sidebarColor: string().required(),
                            discordSuspendChannel: string().nullable(),
                            discordRenewalChannel: string().nullable(),
                        })}
                    >
                        {({ isSubmitting }) => (
                            <Form css={tw`space-y-6`}>
                                <div>
                                    <h3 css={tw`text-lg font-semibold text-white mb-4 border-b border-neutral-700 pb-2`}>General Settings</h3>
                                    <div css={tw`grid grid-cols-1 gap-6`}>
                                        <Field
                                            name={'panelName'}
                                            label={'Panel Name'}
                                            description={'The name displayed in the sidebar and header of the panel.'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 css={tw`text-lg font-semibold text-white mb-4 border-b border-neutral-700 pb-2`}>Colors</h3>
                                    <div css={tw`grid grid-cols-1 md:grid-cols-3 gap-6`}>
                                        <Field
                                            name={'primaryColor'}
                                            label={'Primary Accent Color'}
                                            description={'Hex code (e.g. #3b82f6)'}
                                        />
                                        <Field
                                            name={'secondaryColor'}
                                            label={'Secondary Accent Color'}
                                            description={'Hex code (e.g. #1e40af)'}
                                        />
                                        <Field
                                            name={'sidebarColor'}
                                            label={'Sidebar Background'}
                                            description={'Hex code (e.g. #111827)'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 css={tw`text-lg font-semibold text-white mb-4 border-b border-neutral-700 pb-2 flex items-center gap-2`}>
                                        <MessageSquare size={20} /> Discord Bot
                                    </h3>
                                    <div css={tw`grid grid-cols-1 gap-6`}>
                                        <Field
                                            name={'discordSuspendChannel'}
                                            label={'Suspension Notification Channel ID'}
                                            description={'Channel where bot sends alerts when a server is suspended.'}
                                        />
                                        <Field
                                            name={'discordRenewalChannel'}
                                            label={'Renewal Notification Channel ID'}
                                            description={'Channel where bot sends server expiration warnings.'}
                                        />
                                        <Field
                                            name={'discordRenewalDays'}
                                            label={'Renewal Warning Days'}
                                            type={'number'}
                                            description={'Number of days before expiration to send the warning.'}
                                        />
                                    </div>
                                </div>

                                <div css={tw`flex justify-end mt-6`}>
                                    <Button type={'submit'} disabled={isSubmitting} css={tw`flex items-center gap-2`}>
                                        <Save size={18} /> Save Changes
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </PageContentBlock>
    );
};

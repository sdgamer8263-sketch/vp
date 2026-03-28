import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import useFlash from '@/plugins/useFlash';
import http from '@/api/http';
import PageContentBlock from '@/components/elements/PageContentBlock';
import Field from '@/components/elements/Field';
import Button from '@/components/elements/Button';
import tw from 'twin.macro';

interface Values {
    panelName: string;
}

export default () => {
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const [initialValues, setInitialValues] = useState<Values>({ panelName: 'SKA HOST' });

    useEffect(() => {
        clearFlashes();
        // Fetch current settings from your custom API endpoint
        http.get('/api/admin/theme-settings')
            .then(({ data }) => setInitialValues({ panelName: data.panel_name }))
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
            <div css={tw`w-full flex flex-col`}>
                <h2 css={tw`text-2xl font-bold mb-4 text-neutral-100`}>Theme Settings</h2>
                <div css={tw`bg-neutral-800 p-6 rounded shadow-md w-full max-w-2xl`}>
                    <Formik
                        onSubmit={submit}
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={object().shape({
                            panelName: string().required('A panel name is required.').max(191),
                        })}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div css={tw`mb-6`}>
                                    <Field
                                        name={'panelName'}
                                        label={'Panel Name'}
                                        description={'The name displayed in the sidebar and header of the panel.'}
                                    />
                                </div>
                                <div css={tw`flex justify-end`}>
                                    <Button type={'submit'} disabled={isSubmitting}>
                                        Save Changes
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

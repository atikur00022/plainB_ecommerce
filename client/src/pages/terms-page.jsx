import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";
import FeatureStore from "../stores/FeatureStore.js";

const TermsPage = () => {

    const { LegalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async ()=>{
            await LegalDetailsRequest('terms');
        })()
    }, []);

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default TermsPage;
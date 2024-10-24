import React, {useEffect} from 'react';
import FeatureStore from "../stores/FeatureStore.js";
import LegalContents from "../components/features/legal-contents.jsx";
import Layout from "../components/layout/layout.jsx";

const PrivacyPage = () => {

    const { LegalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async ()=>{
            await LegalDetailsRequest('privacy');
        })()
    }, []);

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default PrivacyPage;
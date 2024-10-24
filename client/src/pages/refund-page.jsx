import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import FeatureStore from "../stores/FeatureStore.js";
import LegalContents from "../components/features/legal-contents.jsx";

const RefundPage = () => {

    const { LegalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async ()=>{
            await LegalDetailsRequest('refund');
        })()
    }, []);

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default RefundPage;
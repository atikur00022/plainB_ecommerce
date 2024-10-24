import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";
import FeatureStore from "../stores/FeatureStore.js";

const ComplainPage = () => {

    const { LegalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async ()=>{
            await LegalDetailsRequest('complain');
        })()
    }, []);

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default ComplainPage;
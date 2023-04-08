import React, { useState } from 'react';

import '../css/policy.css';

const Policy = () => {

    const [file, setFile] = useState(false);

    const statement = [
        `Privacy Policy : We respect your privacy and are committed to protecting your personal information.
         When you sign up for our platform, we collect certain personal information like your name, email address, age,
        gender, and address. We store this information securely and will never disclose any of your personal details to anyone
        without your consent, unless required by law. We take security and trust seriously, and our goal is to create a safe
        environment for you to use our platform. We may use your personal information to improve our platform, provide support
        to you, or send you marketing materials if you have given us permission to do so.`,

         `Terms of Use : Our platform is designed to help you generate income, and we charge a small percentage of
        each transaction to process payments. To ensure the platform runs efficiently, we require a minimum top-up amount
        of 20 euros and a minimum withdrawal amount of 100 euros. This is to prevent small transactions from clogging up the
        system and to help you maximize your earnings. Our platform allows you to create and accept offers, and we encourage
        you to use it to its fullest potential. By using our platform, you agree to follow our Terms of Use, and we reserve the
        right to terminate your account if you violate these terms.`,

        `Intellectual Property Rights : Our platform is owned and operated by UNKNOWN, and all intellectual
        property rights belong to him. We may use your email address to promote our platform, but we will never disclose any
        of your personal details to third parties without your consent. If you have any concerns or questions about your intellectual
        property rights, please contact us and we will do our best to address your concerns.`, 

         `Disclaimers : We strive to keep our platform running smoothly and securely, but we cannot guarantee that
        our platform will be free from errors, viruses, or other harmful components. In the event of a natural disaster, war,
        or other catastrophic event, we will not be held responsible for any damage or loss of data. By using our platform, you
        acknowledge that there are certain risks associated with using any online service, and that you assume these risks at
        your own discretion. We reserve the right to suspend or terminate your account at any time, without notice, if we believe
        that you have violated our Terms of Use or engaged in any activity that is harmful or illegal.`,

         `Payment and Refund Policies : Our platform accepts payment only through credit cards. When you create an account,
        you will be given a personal account ID that you can use to top up your account. We do not store any information about your credit 
        card, except for the date and amount of each transaction. We may refund your payment if you top up your account but never 
        complete a transaction, but we do not offer refunds for any completed transactions. To withdraw funds from your account, you
        must have at least 100 euros earned, and your initial top-up must be at least 20 euros.`,

        `Age Restrictions : Our platform is only available to individuals who are at least 18 years old.
        If you are under the age of 18, you are not allowed to sign up for our platform. If we discover that you have
        violated this age restriction, we may terminate your account and take legal action if necessary.`
    ];

    const outputPolicy = () => {
        return statement.map(e => {
            return <div className='policy-rules' key={e}>{e}</div>
        })
    }

    const displayPolicy = () => {
        setFile(!file);
    }
    return ( 
        <React.Fragment>
            <div className='policy' onClick={displayPolicy}>
                By checking this box, you agree to the terms and conditions outlined in our User Agreement, Privacy Policy .
            </div>
            <div className={file ? 'policy-displayed' : 'policy-not_displayed'}>
                <i className="bi bi-x" onClick={displayPolicy}></i>
                {file ? outputPolicy() : ''}
            </div>
        </React.Fragment>
     );
}
 
export default Policy;
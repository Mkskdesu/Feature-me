import React from "react";
import { VscClose } from 'react-icons/vsc';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import compareVersions from "compare-versions";
import { useRecoilState } from "recoil";

import version from "Config/versions.json";
import Window from "Components/Window/window";
import { termsWindowAtomState } from "State/window/windowState";
import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";

import style from './termsWindow.scss';
import TranslateText from "Components/TranslateText/TranslateText";
//import { deleteEnvironmentData } from "../cacheController/deleteData";



const TermsWindow: React.FC = (): JSX.Element => {
    const environment = JSON.parse(localStorage.getItem("environment")!);
    const [translation, i18n] = useTranslation();
    const animationController = useAnimation();
    const [showTermsWindow, setShowTermsWindow] = useRecoilState(termsWindowAtomState);


    function closeTermsWindow(): void {
        setShowTermsWindow(false);
    }
    function acceptTerms(): void {
        console.log("acceptTerms");

        const environment = JSON.parse(localStorage.getItem("environment")!);
        environment.termsVersion = version.TermsVersion
        environment.termsAccepted = true;
        localStorage.setItem("environment", JSON.stringify(environment));
        closeTermsWindow();

    }
    function declineTerms(): void {
        closeTermsWindow();
        document.body.innerHTML = translation("terms.termsMessage.decline");
        //deleteEnvironmentData();
    }


    return (
        <Window title={translation("terms.title")} className={style.terms_window} showed={showTermsWindow} setShowed={setShowTermsWindow}>
            <div>
                <pre>
                    {translation("terms.content")}
                </pre>
                <div className={style.interaction_wrapper}>
                    <div className={style.interaction}>
                        <ChamferedButton accentColor="#ca1c1c" onClick={declineTerms}>
                            <TranslateText content="terms.button.decline" />
                        </ChamferedButton>
                        <ChamferedButton onClick={acceptTerms}>
                            <TranslateText content="terms.button.accept" />
                        </ChamferedButton>
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default TermsWindow;
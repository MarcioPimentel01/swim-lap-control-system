// tools/inject-version.js
const { version } = require('../../package.json');
const fs = require('fs');

fs.writeFileSync('./src/version.js', `export const appVersion = "${version}";\n`);



//! Only to handle HTML documents logic.

export const initPasswordVisibilityToggle = () => {
    const toggleButtonsLogin = document.getElementById("toggle-password-visibility-login");
    const toggleIconsLogin = document.getElementById("toggle-password-icon-login");
    const toggleButtonsRegister = document.getElementById("toggle-password-visibility-register");
    const toggleIconsRegister = document.getElementById("toggle-password-icon-register");
    const passwordInputLogin = document.getElementById("password-input-login");
    const passwordInputRegister = document.getElementById("password-input-register");


    if (!toggleButtonsLogin || !toggleButtonsRegister || !toggleIconsLogin || !toggleIconsRegister || !passwordInputLogin || !passwordInputRegister) {
    console.warn("Password visibility toggle elements not found.");
    return;
    }

    //! ✅ Login Modal Toggle
    toggleButtonsLogin.addEventListener("click", () => {
        const isPasswordLogin = passwordInputLogin.type === "password";
        passwordInputLogin.type = isPasswordLogin ? "text" : "password";
        toggleIconsLogin.classList.toggle("bi-eye", isPasswordLogin);
        toggleIconsLogin.classList.toggle("bi-eye-slash", !isPasswordLogin);
    });

    //! ✅ Register Modal Toggle
    toggleButtonsRegister.addEventListener("click", () => {
        const isPasswordRegister = passwordInputRegister.type === "password";
        passwordInputRegister.type = isPasswordRegister ? "text" : "password";
        toggleIconsRegister.classList.toggle("bi-eye", isPasswordRegister);
        toggleIconsRegister.classList.toggle("bi-eye-slash", !isPasswordRegister);
    });
    };

    //! ✅ Version Modal 

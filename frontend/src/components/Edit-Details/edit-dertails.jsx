import React from 'react';
import styles from "./edit-details.module.css";
import useStore from '../../store';
import api from '../../libs/apiCalls.js';
import { toast } from 'sonner';

function EditDetails({ keyVal }) {
    let content = null;
    console.log("Key value: ", keyVal);

    const { user, setCredentials } = useStore((state) => state);

    const Languages = [
        { value: "english", label: "English" },
        { value: "spanish", label: "Spanish" },
        { value: "french", label: "French" },
        { value: "german", label: "German" },
        { value: "chinese", label: "Chinese" },
        { value: "japanese", label: "Japanese" },
        { value: "korean", label: "Korean" },
        { value: "hindi", label: "Hindi" },
        { value: "arabic", label: "Arabic" },
        { value: "portuguese", label: "Portuguese" },
        { value: "russian", label: "Russian" },
        { value: "italian", label: "Italian" },
        { value: "dutch", label: "Dutch" },
        { value: "swedish", label: "Swedish" },
        { value: "norwegian", label: "Norwegian" },
        { value: "danish", label: "Danish" },
        { value: "finnish", label: "Finnish" },
        { value: "polish", label: "Polish" },
        { value: "turkish", label: "Turkish" },
        { value: "greek", label: "Greek" },
        { value: "hungarian", label: "Hungarian" },
        { value: "czech", label: "Czech" },
        { value: "romanian", label: "Romanian" },
        { value: "bulgarian", label: "Bulgarian" },
        { value: "ukrainian", label: "Ukrainian" },
        { value: "thai", label: "Thai" },
        { value: "vietnamese", label: "Vietnamese" },
        { value: "indonesian", label: "Indonesian" },
        { value: "malay", label: "Malay" },
        { value: "filipino", label: "Filipino" },
        { value: "swahili", label: "Swahili" },
        { value: "hebrew", label: "Hebrew" },
        { value: "persian", label: "Persian" },
        { value: "urdu", label: "Urdu" },
        { value: "bengali", label: "Bengali" },
        { value: "tamil", label: "Tamil" },
        { value: "telugu", label: "Telugu" },
        { value: "marathi", label: "Marathi" },
        { value: "gujarati", label: "Gujarati" },
        { value: "punjabi", label: "Punjabi" },
        { value: "malayalam", label: "Malayalam" },
        { value: "kannada", label: "Kannada" },
        { value: "odia", label: "Odia" },
    ];

    if (keyVal === '1') {
        content = (
            <form method='post' onSubmit={editDetails}>
                <label>Date of Birth</label>
                <input type="date" pattern="\d{4}-\d{2}-\d{2}" />
                <button type='submit'>Save</button>
            </form>
        )
    }
    if (keyVal === '2') {
        content = (
            <form method='post' onSubmit={editDetails}>
                <label>Gender</label>
                <select>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button type='submit'>Save</button>
            </form>
        )
    }
    if (keyVal === '3') {
        content = (
            <form method='post' onSubmit={editDetails}>
                <label>Language</label>
                <input list='languages' type="text" id="language" />
                <datalist id='languages' className={styles.dataList}>
                    {Languages.map((lang, index) => (
                        <option key={index} value={lang.label}>{lang.label}</option>
                    ))}
                </datalist>
                <button type='submit'>Save</button>
            </form>
        )
    }

    async function editDetails(e) {
        e.preventDefault();
        let updatedUser = { ...user };

        if (keyVal === '1') {
            // Update dob
            const newDob = e.target.elements[0].value;
            updatedUser.dob = newDob;
        } else if (keyVal === '2') {
            // Update gender
            const newGender = e.target.elements[0].value;
            updatedUser.gender = newGender;
        } else if (keyVal === '3') {
            // Update language
            const newLang = e.target.elements[0].value;
            updatedUser.language = newLang;
        }

        try {
            const response = await api.put("/details/userInfo", {
                name: updatedUser.name,
                gender: updatedUser.gender,
                dob: updatedUser.dob,
                language: updatedUser.language
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                localStorage.setItem('jiouser', JSON.stringify(updatedUser));

                setCredentials(updatedUser);
                window.location.reload();
            } else {
                toast.error("Failed to update details");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            {content}
        </div>
    )
}

export default EditDetails
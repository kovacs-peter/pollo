import { useDispatch } from "react-redux";
import { setInfo } from "../redux/infoSlice";

const validatePresence = (value) => !!value.length;

const useValidate = () => {
    const dispatch = useDispatch();
    const validate = (dataArray) => {
        let invalids = [];
        dataArray.forEach((data) => {
            if (Array.isArray(data.value)) {
                if (data.value.length < 2)
                    invalids.push(`At least 2 ${data.key} required`);
                if (data.value.some((val) => !validatePresence(val)))
                    invalids.push(`Fill out all ${data.key}!`);
            } else {
                if (data.required) {
                    if (!validatePresence(data.value))
                        invalids.push(`Fill out ${data.key}!`);
                }
            }
        });
        if (invalids.length)
            dispatch(setInfo({ infoType: "error", infoText: invalids.join(" | ") }));
        return !invalids.length;
    };

    return { validate };
};

export default useValidate;

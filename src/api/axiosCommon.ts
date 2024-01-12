import Axios from "axios";

// axiosの設定
const axiosCommon = Axios.create({
    headers: {
        Authorization: `Bearer FOO`,
    },
});

export default axiosCommon;

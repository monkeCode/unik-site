import axios from "axios";
export default async function getUser()
{

    const resp = await axios.get(`/api/getme`);
    if (resp.status === 200)
        return resp.data;
    return null;

}
import axios from "../../../../settings/AxiosClient";
import type ResponseAPI from "../../../models/ResponseAPI";
import type { MatchSetup } from "../models/DataObject";

export const fetchModeAPI = async (): Promise<ResponseAPI> => {
    try {
        const response = await axios.get('/v1/modes');

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        if (response.status === 200) {
            // console.log('Login successful:', result.data);
        } else {
            console.warn(Unexpected response status: ${response.status});
        }

        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

export const fetchModeTestAPI = async (id: number): Promise<ResponseAPI> => {
    try {
        const response = await axios.get(/v1/modes/${id});

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        if (response.status === 200) {
            console.log('Mode :', result.data);
        } else {
            console.warn(Unexpected response status: ${response.status});
        }

        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}
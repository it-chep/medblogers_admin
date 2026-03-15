import { fetchAuth } from "../../../shared/api/ApiService";
import { ICreateMMRequest, IMastermindItem } from "../model/types";

class MastermindService {
    async createMM(data: ICreateMMRequest) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/mm`, {
            method: 'POST',
            body: JSON.stringify({
                mmDatetime: data.mmDatetime,
                name: data.name,
                mmLink: data.mmLink,
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async manualNotificationMM(mmId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/mm/${mmId}/manual_notification`, {
            method: 'POST',
            body: JSON.stringify({ mmId }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async changeMMActivity(mmId: number, activity: boolean) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/mm/${mmId}/change_mm_activity`, {
            method: 'POST',
            body: JSON.stringify({ mmId, activity }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getMMList(): Promise<IMastermindItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/mm`)
        const {mms}: { mms: IMastermindItem[] } = await res.json()

        return mms
    }
}

export const mastermindService = new MastermindService()

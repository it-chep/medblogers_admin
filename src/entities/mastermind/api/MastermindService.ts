import { fetchAuth } from "../../../shared/api/ApiService";
import { ICreateMMRequest, IMastermindItem } from "../model/types";

type IMastermindDTO = {
    mmId?: number;
    mm_id?: number;
    mmDatetime?: string;
    mm_datetime?: string;
    name?: string;
    createdAt?: string;
    created_at?: string;
    status?: string;
    activity?: boolean;
    mmLink?: string;
    mm_link?: string;
}

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
        const data: { mms?: IMastermindDTO[] } = await res.json()

        return (data.mms || []).map((item) => ({
            mmId: item.mmId ?? item.mm_id ?? 0,
            mmDatetime: item.mmDatetime ?? item.mm_datetime ?? '',
            name: item.name ?? '',
            createdAt: item.createdAt ?? item.created_at ?? '',
            status: item.status ?? '',
            activity: Boolean(item.activity),
            mmLink: item.mmLink ?? item.mm_link ?? '',
        }))
    }
}

export const mastermindService = new MastermindService()

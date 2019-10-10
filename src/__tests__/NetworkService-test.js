import {sendRequestToBackend} from "../NetworkService";

import { responseData } from "../../__mock__/DummyData";

const url = "https://randomuser.me/api/0.4/?randomapi";

describe('sendRequestToBackend function', () => {
       
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('sendRequestToBackend', () => {
        fetch.mockResponseOnce(JSON.stringify(responseData))

        sendRequestToBackend(url, null, 'GET', ()=>{}).then(data => {
            expect(data.seed).toEqual('977d45b116b8ae36')
        })
    })
})
import { buildRequest } from "../request.js";

const testRequest = () => {

    describe('request.js', () =>{

        test('Should be build a request to send', () => {

            document.body.innerHTML = `
                <div class="references">
                    <input name="csrfmiddlewaretoken" value="token-for-request">
                </div>
            `
            const data = {title: "New project"},
                request = buildRequest(data);

            expect(request.method).toBe("POST");
            expect(request.headers.get("Content-Type")).toBe("application/json");
            expect(request.headers.get("X-CSRFToken")).toBe("token-for-request");
            expect(typeof request.body).toBe("string");

        });
    }) 
}

export default testRequest;
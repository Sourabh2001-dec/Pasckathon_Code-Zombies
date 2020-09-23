import React from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
function Login() {
    const handleSubmit = () => {
        alert(`Hello`);
    };
    return (
        <div className="p-grid p-justify-center p-align-center">
            <div className="p-col-4" />
            <div className="p-col-3">
                <Card>
                    <h4>Login</h4>
                    <hr></hr>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <i className="pi pi-user">&nbsp;&nbsp;</i>
                            <InputText id="username" placeholder="Username" />
                        </div>
                        <br></br>
                        <div>
                            <i className="pi pi-key">&nbsp;&nbsp;</i>
                            <Password placeholder="Password" feedback={false} />
                        </div>
                    </form>
                    <br></br>
                    <Button htmlType="submit" label="Login"></Button>
                </Card>

            </div>

            <div className="p-col-4" />
        </div>
    )
}

export default Login

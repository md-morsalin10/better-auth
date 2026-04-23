"use client"
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";

const SignIn = () => {
      const [isVisible, setIsVisible] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const UserData = Object.fromEntries(formData.entries());
      

        console.log("form data", UserData);

        const { data, error } = await authClient.signIn.email({
            email: UserData.email,
            password: UserData.password,
            callbackURL: "/"
        });

        console.log("singUp", { data, error });
        if (error) {
            alert("Error signing up" + error.message);

        }
        if (data) {
            alert('sing In successful')
        }
    };
    return (
        <div className="flex flex-col justify-center items-center py-10">
            <h1>SingIn page</h1>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                {/* email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input name="email" placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField className="w-full" name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full"
                            type={isVisible ? "text" : "password"}
                            
                        />
                        <InputGroup.Suffix className="pr-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignIn;
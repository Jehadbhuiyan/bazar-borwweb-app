"use client";

import { FieldError, Input, InputGroup, Label, TextField } from "@heroui/react";
import { passwordValidate } from "./PasswordValidate";

export const NameField = ({
  name = "name",
  label = "নাম",
  placeholder = "Name",
  isRequired = true,
  defaultValue = "",
}) => {
  return (
    <TextField
      isRequired={isRequired}
      name={name}
      className="w-full"
      defaultValue={defaultValue}
      validate={(value) => {
        if (value.length < 3) {
          return "Name must be at least 3 characters";
        }
        return null;
      }}
    >
      <Label>{label}</Label>
      <Input placeholder={placeholder} className="w-full" />
      <FieldError />
    </TextField>
  );
};

export const EmailField = ({
  name = "email",
  label = "ইমেইল",
  placeholder = "john@example.com",
  isRequired = true,
  defaultValue = "",
}) => {
  return (
    <TextField
      isRequired={isRequired}
      name={name}
      type="email"
      className="w-full"
      defaultValue={defaultValue}
      validate={(value) => {
        if (!value && isRequired) {
          return "Email is required";
        }

        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return "Please enter a valid email address";
        }

        return null;
      }}
    >
      <Label>{label}</Label>

      <Input type="email" placeholder={placeholder} className="w-full" />

      <FieldError />
    </TextField>
  );
};


export const PasswordField = ({
  isRequired = true,
  name = "password",
  placeholder = "পাসওয়ার্ড লিখুন",
  label = 'পাসওয়ার্ড'
}) => (
  <TextField
    isRequired={isRequired}
    minLength={8}
    name={name}
    type="password"
    className="w-full"
    validate={passwordValidate}
  >
    <Label>{label}</Label>

    <Input
      type="password"
      placeholder={placeholder}
      className="w-full"
    />

    <FieldError />
  </TextField>
);



export const WebsiteField = ({
  name = "website",
  label = "Website",
  placeholder = "example.com",
  isRequired = false,
}) => (
  <TextField
    className="w-full max-w-70"
    name={name}
    isRequired={isRequired}
  >
    <Label>{label}</Label>

    <InputGroup>
      <InputGroup.Prefix>https://</InputGroup.Prefix>

      <InputGroup.Input
        name={name}
        placeholder={placeholder}
        className="w-full"
      />
    </InputGroup>
  </TextField>
);


"use client";

import { Button, FieldError, Input, InputGroup, Label, TextField } from "@heroui/react";
import { passwordValidate } from "./PasswordValidate";
import { useState } from "react";
import {Eye, EyeSlash} from "@gravity-ui/icons";

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
  label = "পাসওয়ার্ড",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");

  const error = passwordValidate(password);

  return (
    <div className="w-full max-w-70">
      <Label>{label}</Label>

      <InputGroup>
        <InputGroup.Input
          className="w-full"
          type={isVisible ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={password}
          isRequired={isRequired}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            type="button"
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? (
              <Eye className="size-4" />
            ) : (
              <EyeSlash className="size-4" />
            )}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>

      {password && error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
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


"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Heading,
  Stack,
  StackDivider,
  Input,
  Button,
} from "@chakra-ui/react";
import { supabase } from "@/utils/supabase/supabase";
import { useRouter } from "next/navigation";

import Header from "@/components/layouts/Header";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const doLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    console.log(data);
    router.refresh();
  };

  return (
    <>
      <Header />
      <Card maxW="sm">
        <CardHeader>
          <Heading size="md">ログイン</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                メールアドレス：
              </Heading>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                パスワード：
              </Heading>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </Box>
            <Button
              style={{ width: 220 }}
              color="primary"
              onClick={() => {
                doLogin();
              }}
            >
              ログイン
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default Register;

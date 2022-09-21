import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box } from '@/components/atoms/box';
import { TextInput } from '@/components/atoms/text-input';
import { Button } from '@/components/atoms/button';
import { SessionRepository } from '@/repositories/session';
import { isSuccess } from '@/either';
import { Text } from '@/components/atoms/text';
import { http } from '@/libs/axios';
import { KeeperProvider } from '@/providers/keeper';
import { useSession } from '@/contexts/session';

const schema = z.object({
  email: z.string().min(1, 'Campo obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Campo obrigatório'),
});
const sessionRepository = SessionRepository();
const keeperProvider = KeeperProvider();

export function SessionPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const setUser = useSession((context) => context.setUser);

  async function submit(fields: z.infer<typeof schema>) {
    setIsSubmitting(true);
    setErrorMessage('');
    const result = await sessionRepository.create(fields.email, fields.password);
    if (isSuccess(result)) {
      http.defaults.headers.common.Authorization = `Bearer ${result.success.token}`;
      await keeperProvider.save(KeeperProvider.KEY_TOKEN, result.success.token);
      setUser(result.success);
    } else {
      setErrorMessage(result.failure.message);
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (errorMessage) Alert.alert('Atenção', errorMessage);
  }, [errorMessage]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <Box
        flex={1}
        justifyContent="center"
        padding="md">
        <Text
          color="text.500"
          size={30}
          textAlign="center">
          Onvitri Lojista
        </Text>
        <Box height="md" />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="E-mail"
              placeholder="Digite seu e-mail"
              onChange={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        <Box height="md" />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Senha"
              placeholder="Digite sua senha"
              onChange={onChange}
              value={value}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />
        <Box height="md" />
        <Button
          loading={isSubmitting}
          title="Enviar"
          color="shape.100"
          background="primary"
          onPress={handleSubmit(submit)}
        />
      </Box>
    </ScrollView>
  );
}

SessionPage.URL = 'pages/session';

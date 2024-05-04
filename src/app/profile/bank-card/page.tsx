'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Form, Formik } from 'formik';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { InputLayout, Main, TopAppBar } from '@/libs/ui';
import { useMutation } from '@tanstack/react-query';
import { addCard, removeCard } from '@/libs/query';

interface BankCard {
  number: string;
  cvv: string;
  expiryDate: string;
  name: string;
}

export default function BankCardPage() {
  const router = useRouter();
  const [bank, setBank] = useState(null);
  const cardInfo = {
    number: '**** **** **** 1234',
    bank: '970436',
    cvv: '123',
    exp: '12/2023',
    name: 'TRIEU NHAT MINH',
  };

  const initialValues: BankCard = {
    number: '',
    name: '',
    expiryDate: '',
    cvv: '',
  };

  useEffect(() => {
    fetch('https://api.vietqr.io/v2/banks')
      .then((response) => response.json())
      .then((data) => {
        const bank = data.data.find((bank: { bin: string }) => bank.bin === cardInfo.bank);
        setBank(bank);
      });
  }, []);

  const addCardMutation = useMutation({
    mutationFn: (data: { userId: string; data: any }) => addCard(data.userId, data.data),
    onSuccess: () => {
      router.push('/profile');
      // show success message
      alert('Thêm thẻ thành công');
    },
    onError: (error) => {
      // show error message
      alert('Thêm thẻ thất bại ' + error.message);
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: (userId: string) => removeCard(userId),
    onSuccess: () => {
      router.push('/profile');
      // show success message
      alert('Hủy thẻ thành công');
    },
    onError: (error) => {
      // show error message
      alert('Hủy thẻ thất bại ' + error.message);
    },
  });

  const handleRemoveCard = () => {
    removeCardMutation.mutate('1');
  };

  // TODO: fetch from the server to check if there is a card, then render the corresponding part
  return (
    <Main>
      <TopAppBar title='Liên kết thẻ' backHref='/profile' />
      <Card
        variant='outlined'
        sx={{
          p: 2,
          width: {
            xs: '100%',
            md: '30rem',
          },
          mb: 2,
        }}>
        <Typography variant='body2'>{(bank as unknown as { name: string })?.name}</Typography>
        <Image
          alt='bank logo'
          src={(bank as unknown as { logo: string })?.logo}
          width={100}
          height={50}
          placeholder='empty'
        />
        <Typography variant='body2'>{cardInfo.number}</Typography>
        <Typography variant='body2'>{cardInfo.name}</Typography>
        <Typography variant='body2'>{cardInfo.exp}</Typography>
      </Card>
      <Button color='error' variant='outlined' onClick={handleRemoveCard}>
        Hủy liên kết
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography color='text.secondary' gutterBottom>
          Bạn chưa liên kết thẻ nào
        </Typography>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
          }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              addCardMutation.mutate({ userId: '1', data: values });
            }}>
            <Form>
              <Stack spacing={2}>
                <InputLayout
                  label='Số thẻ'
                  required
                  formik
                  inputProps={{
                    name: 'number',
                    placeholder: '1234 5678 9101',
                  }}
                />
                <InputLayout
                  label='Tên chủ thẻ'
                  inputProps={{
                    name: 'name',
                    placeholder: 'TRIEU NHAT MINH',
                  }}
                  required
                  formik
                />
                <InputLayout
                  label='Ngày hết hạn'
                  inputProps={{
                    type: 'month',
                    name: 'expiryDate',
                    placeholder: 'MM/YY',
                  }}
                  required
                  formik
                />
                <InputLayout
                  label='Mã CVV'
                  inputProps={{
                    name: 'cvv',
                    placeholder: '123',
                  }}
                  required
                  formik
                />
                <Button variant='contained' type='submit'>
                  Xác thực
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Main>
  );
}

'use client';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik, Field } from 'formik';

import { Autocomplete, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { addCard, getBanks, getCardByUser, removeCard } from '@/libs/query';
import { InputLayout, Main, TopAppBar, LoadingButton } from '@/libs/ui';
import { useToast } from '@/hooks';
import { getStoredValue } from '@/libs/utils';
import { CardInfoSchema } from '@/libs/validations';

interface BankCard {
  bankName: string;
  cardAccountNumber: string;
  cardAccountName: string;
  cardExpiredDate: string;
  cardCvv: string;
  phone: string;
}

export default function BankCardPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const userId = getStoredValue('user_id');
  const initialValues: BankCard = {
    bankName: '',
    cardAccountNumber: '',
    cardAccountName: '',
    cardExpiredDate: '',
    cardCvv: '',
    phone: '',
  };

  const {
    data: banks,
    status: bankStatus,
    isFetching,
  } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
  });

  const { data: card, status: cardStatus } = useQuery({
    queryKey: ['card', userId],
    queryFn: getCardByUser,
  });

  const addCardMutation = useMutation({
    mutationFn: addCard,
    onSuccess: (data) => {
      toast.setToast('success', 'Thêm thẻ thành công');
      queryClient.setQueryData(['card', userId], data);
    },
    onError: (error) => {
      toast.setToast('error', 'Thêm thẻ thất bại', error.message);
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: () => removeCard(card.id),
    onSuccess: () => {
      toast.setToast('success', 'Hủy thẻ thành công');
      queryClient.setQueryData(['card', userId], null);
    },
    onError: (error) => {
      toast.setToast('error', 'Hủy thẻ thất bại', error.message);
    },
  });

  function BankInfo() {
    const bank = banks.filter((bank: { short_name: string }) => bank.short_name === card.bankName)[0];
    return (
      <>
        <Typography variant='body2'>{(bank as unknown as { name: string })?.name}</Typography>
        <Image
          alt='bank logo'
          src={(bank as unknown as { logo: string })?.logo}
          width={100}
          height={50}
          placeholder='empty'
        />
      </>
    );
  }

  return (
    <Main>
      <TopAppBar title='Liên kết thẻ' backHref='/profile' />
      {cardStatus === 'success' && card && (
        <>
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
            <BankInfo />
            <Typography variant='body2'>{card.cardAccountNumber}</Typography>
            <Typography variant='body2'>{card.cardAccountName}</Typography>
            <Typography variant='body2'>{card.cardExpiredDate}</Typography>
          </Card>
          <LoadingButton
            color='error'
            variant='outlined'
            onClick={() => removeCardMutation.mutate()}
            loading={removeCardMutation.isPending}>
            Hủy liên kết
          </LoadingButton>
        </>
      )}
      {cardStatus === 'success' && !card && (
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
              validationSchema={CardInfoSchema}
              onSubmit={(values) => {
                addCardMutation.mutate({ ownerId: userId, ...values });
              }}>
              {({ touched, errors }) => {
                console.log(errors);
                return (
                  <Form>
                    <Stack spacing={2}>
                      {bankStatus === 'success' && (
                        <InputLayout
                          label='Ngân hàng'
                          helperText={touched.bankName && errors.bankName ? errors.bankName : ''}>
                          <Field name='bankName'>
                            {({ field, form }: { field: any; form: any }) => {
                              const handleChange = (_e: any, newValue: string | null) => {
                                form.setFieldValue(field.name, newValue);
                              };
                              return (
                                <Autocomplete
                                  {...field}
                                  autoHighlight
                                  clearOnBlur
                                  loading={isFetching}
                                  value={field.value}
                                  onChange={handleChange}
                                  getOptionLabel={(option) => option}
                                  componentsProps={{
                                    paper: {
                                      elevation: 2,
                                    },
                                  }}
                                  options={banks.map((bank: { short_name: string }) => bank.short_name)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={touched.bankName && errors.bankName ? true : false}
                                      variant='outlined'
                                      inputProps={{
                                        ...params.inputProps,
                                        placeholder: 'Chọn ngân hàng',
                                      }}
                                      sx={{
                                        '& .MuiInputBase-input': {
                                          paddingTop: 0,
                                        },
                                      }}
                                    />
                                  )}
                                />
                              );
                            }}
                          </Field>
                        </InputLayout>
                      )}
                      <InputLayout
                        label='Số thẻ'
                        formik
                        inputProps={{
                          name: 'cardAccountNumber',
                          placeholder: '1234 5678 9101',
                          error: touched.cardAccountNumber && errors.cardAccountNumber ? true : false,
                        }}
                        helperText={
                          touched.cardAccountNumber && errors.cardAccountNumber ? errors.cardAccountNumber : ''
                        }
                      />
                      <InputLayout
                        label='Tên chủ thẻ'
                        inputProps={{
                          name: 'cardAccountName',
                          placeholder: 'TRIEU NHAT MINH',
                          error: touched.cardAccountName && errors.cardAccountName ? true : false,
                        }}
                        helperText={touched.cardAccountName && errors.cardAccountName ? errors.cardAccountName : ''}
                        formik
                      />
                      <InputLayout
                        label='Ngày hết hạn'
                        inputProps={{
                          type: 'date',
                          name: 'cardExpiredDate',
                          placeholder: 'MM/YY',
                          error: touched.cardExpiredDate && errors.cardExpiredDate ? true : false,
                        }}
                        helperText={touched.cardExpiredDate && errors.cardExpiredDate ? errors.cardExpiredDate : ''}
                        formik
                      />
                      <InputLayout
                        label='Mã CVV'
                        inputProps={{
                          name: 'cardCvv',
                          placeholder: '123',
                          error: touched.cardCvv && errors.cardCvv ? true : false,
                        }}
                        helperText={touched.cardCvv && errors.cardCvv ? errors.cardCvv : ''}
                        formik
                      />
                      <InputLayout
                        label='Số điện thoại'
                        inputProps={{
                          name: 'phone',
                          placeholder: '0939071122',
                          error: touched.phone && errors.phone ? true : false,
                        }}
                        helperText={touched.phone && errors.phone ? errors.phone : ''}
                        formik
                      />
                      <LoadingButton variant='contained' type='submit' loading={addCardMutation.isPending}>
                        Xác thực
                      </LoadingButton>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      )}
    </Main>
  );
}

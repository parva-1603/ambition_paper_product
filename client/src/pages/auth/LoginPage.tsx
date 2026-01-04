import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaPhone } from 'react-icons/fa';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithPhone, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error signing in with Google',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    try {
      setIsLoading(true);
      const formattedPhoneNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `+91${phoneNumber}`;
      
      const result = await signInWithPhone(formattedPhoneNumber);
      setConfirmationResult(result);
      setShowOtpInput(true);
      toast({
        title: 'OTP Sent',
        description: 'Please enter the OTP sent to your phone',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send OTP. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!confirmationResult || otp.length !== 6) return;

    try {
      setIsLoading(true);
      const verified = await verifyOtp(confirmationResult, otp);
      if (verified) {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid OTP. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w={'full'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Text as="span" color={'blue.400'}>
              features
            </Text>{' '}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            {!showOtpInput ? (
              <form onSubmit={handlePhoneSubmit}>
                <VStack spacing={4}>
                  <Button
                    w={'full'}
                    variant={'outline'}
                    leftIcon={<FcGoogle />}
                    onClick={handleGoogleSignIn}
                    isDisabled={isLoading}
                  >
                    <Text>Sign in with Google</Text>
                  </Button>
                  
                  <Text>OR</Text>
                  
                  <FormControl id="phone" isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <HStack>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        pattern="[0-9]{10}"
                        maxLength={10}
                      />
                      <Button
                        colorScheme="blue"
                        leftIcon={<FaPhone />}
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Sending OTP"
                      >
                        Get OTP
                      </Button>
                    </HStack>
                  </FormControl>
                </VStack>
              </form>
            ) : (
              <VStack spacing={4}>
                <Text fontSize="md">Enter the 6-digit OTP sent to {phoneNumber}</Text>
                <HStack>
                  <PinInput
                    otp
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    onComplete={handleOtpSubmit}
                    isDisabled={isLoading}
                  >
                    {[...Array(6)].map((_, i) => (
                      <PinInputField key={i} />
                    ))}
                  </PinInput>
                </HStack>
                <Button
                  colorScheme="blue"
                  onClick={handleOtpSubmit}
                  isLoading={isLoading}
                  loadingText="Verifying OTP"
                  w="full"
                >
                  Verify OTP
                </Button>
                <Button
                  variant="link"
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtp('');
                  }}
                  isDisabled={isLoading}
                >
                  Change Phone Number
                </Button>
              </VStack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

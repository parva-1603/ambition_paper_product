import { extendTheme } from '@chakra-ui/react'; 

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      200: '#80c8ff',
      300: '#4db0ff',
      400: '#1a97ff',
      500: '#0077e6',
      600: '#005cb3',
      700: '#004180',
      800: '#00264d',
      900: '#000b1a',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      'main': {
        flex: '1',
        padding: '2rem 0',
      },
      'a': {
        color: props.colorMode === 'dark' ? 'blue.300' : 'blue.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
        _focus: {
          boxShadow: 'outline',
        },
      },
      variants: {
        solid: (props: { colorMode: string }) => ({
          bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.300' : 'brand.600',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.700',
          },
        }),
        outline: (props: { colorMode: string }) => ({
          borderColor: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
          color: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.900' : 'brand.50',
          },
        }),
      },
    },
    Input: {
      baseStyle: (props: { colorMode: string }) => ({
        field: {
          _focus: {
            borderColor: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
            boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#4db0ff' : '#1a97ff'}`,
          },
        },
      }),
    },
  },
});

export default theme;

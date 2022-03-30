import { extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/work-sans';
import '@fontsource/work-sans/700.css';
import '@fontsource/roboto-mono';
import '@fontsource/montserrat';
import '@fontsource/montserrat/700.css';

export const theme = extendTheme({
    fonts: {
        body: 'Open Sans, sans-serif',
        heading: 'Work Sans, sans-serif',
        mono: 'Roboto Mono, monospace'
    },
    colors: {
        brand: {
            50: '#DFF4D4',
            100: '#CFEEBF',
            200: '#BEE9A9',
            300: '#AEE394',
            400: '#9EDE7E',
            500: '#8CD867',
            600: '#73CF44',
            700: '#5CB62F',
            800: '#4A9226',
            900: '#376D1C'
        },
        jumbo: {
            50: '#FFF0B6',
            100: '#FFE992',
            200: '#FFE26D',
            300: '#FFDB49',
            400: '#FFD324',
            500: '#FFCC00',
            600: '#DBAF00',
            700: '#B69200',
            800: '#927500',
            900: '#6D5700'
        },
        ah: {
            50: '#ADE7FF',
            100: '#85DAFF',
            200: '#5CCEFF',
            300: '#33C2FF',
            400: '#0AB6FF',
            500: '#00A0E2',
            600: '#0087C0',
            700: '#0070A0',
            800: '#005A80',
            900: '#004360'
        },
        aldi: {
            50: '#B0EDFF',
            100: '#89E3FF',
            200: '#62DAFF',
            300: '#3AD1FF',
            400: '#13C8FF',
            500: '#00b6ed',
            600: '#009AC9',
            700: '#0080A8',
            800: '#006786',
            900: '#004D65'
        },
        coop: {
            50: '#FFE2B3',
            100: '#FFD38D',
            200: '#FFC567',
            300: '#FFB642',
            400: '#FFA81C',
            500: '#f39400',
            600: '#D28100',
            700: '#AF6C00',
            800: '#8C5600',
            900: '#694100'
        },
        plus: {
            50: '#DDF4B7',
            100: '#CBEE93',
            200: '#BAE96F',
            300: '#A9E34B',
            400: '#98DD27',
            500: '#80BD1D',
            600: '#6EA319',
            700: '#5C8715',
            800: '#496C11',
            900: '#37510D'
        }
    },
    initialColorMode: 'light',
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'brand'
            },
            baseStyle: {
                _focus: {
                    boxShadow: 'none'
                },
                transition: 'all 0.2s'
            }
        },
        Input: {
            defaultProps: {
                colorScheme: 'brand'
            }
        },
        Checkbox: {
            baseStyle: {
                transition: 'all 0.2s'
            },
            defaultProps: {
                colorScheme: 'brand'
            }
        },
        Link: {
            baseStyle: {
                _focus: {
                    boxShadow: 'none'
                },
                transition: 'all 0.2s'
            }
        },
        Text: {
            baseStyle: {
                transition: 'all 0.2s'
            }
        },
        Heading: {
            baseStyle: {
                transition: 'all 0.2s'
            }
        },
        Badge: {
            baseStyle: {
                transition: 'all 0.2s'
            }
        },
        Skeleton: {
            baseStyle: {
                transition: 'all 0.2s'
            }
        }
    }
});

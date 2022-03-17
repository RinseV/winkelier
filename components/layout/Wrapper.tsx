import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';

type WrapperVariant = 'small' | 'regular' | 'large' | 'full';

interface WrapperProps {
    children: React.ReactNode;
    variant?: WrapperVariant;
}

export const Wrapper = ({ children, variant = 'regular' }: WrapperProps): JSX.Element => {
    const getWidth = () => {
        switch (variant) {
            case 'small':
                return '400';
            case 'large':
                return '90%';
            case 'full':
                return '100%';
            default:
                return '1200';
        }
    };

    return (
        <Box
            mt={4}
            mx="auto"
            maxW={getWidth()}
            w="100%"
            bg={useColorModeValue('gray.50', 'gray.800')}
            transition="0.2s"
        >
            {children}
        </Box>
    );
};

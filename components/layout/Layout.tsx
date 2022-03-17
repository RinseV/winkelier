import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const Layout: React.FC<FlexProps> = (props) => {
    return (
        <Flex p={4} direction="column" alignItems="center" flex={1} transition="0.2s" {...props}>
            {props.children}
        </Flex>
    );
};

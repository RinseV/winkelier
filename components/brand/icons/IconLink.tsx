import { LinkProps, Link } from '@chakra-ui/react';
import React from 'react';

export const IconLink: React.FC<LinkProps> = (props) => {
    return (
        <Link
            transition="all 0.1s"
            _hover={{
                transform: 'scale(1.1)'
            }}
            {...props}
        >
            {props.children}
        </Link>
    );
};

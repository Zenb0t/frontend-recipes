import SearchIcon from '@mui/icons-material/Search';
import { TextField, useTheme, alpha, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value);
        console.log(`Search term: ${event.target.value}`);
    };

    function handleSearch() {
        navigate(`/recipes`, { replace: true });
        console.log(`Search Query: ${searchQuery}`);
        setSearchParams({ title: searchQuery});
        console.log(`Search Params: ${searchParams}`);
    }

    const theme = useTheme();

    useEffect(() => {
        console.log(`Search Params: ${searchParams}`);
    }, [searchParams]);


    return (
        <>
            <TextField
                name="searchTerm"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search..."
                sx={{
                    mx: 2,
                    position: 'relative',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: alpha(theme.palette.common.white, 0.80),
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.common.white, 0.90),
                    },
                    marginLeft: 0,
                    width: '100%',
                    [theme.breakpoints.up('sm')]: {
                        marginLeft: theme.spacing(1),
                        width: 'auto',
                    },
                }}
            />
            <IconButton onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </>
    );
}
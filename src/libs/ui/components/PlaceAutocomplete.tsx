'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

import ClearIcon from '@mui/icons-material/CancelRounded';

const StyledInput = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  fontWeight: '600',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
    height: '3rem',
  },
}));

interface AutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onClear?: () => void;
  inputProps: OutlinedInputProps;
}

export function PlaceAutocomplete({ onPlaceSelect, onClear, inputProps }: AutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [inputValue, setInputValue] = useState(''); // Add this line
  const places = useMapsLibrary('places');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!places || !inputRef.current) return;
    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    setGeocoder(new google.maps.Geocoder());
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();
      if (place.formatted_address)
        setInputValue(place.formatted_address); // Update the input value when a place is selected
      else {
        geocoder?.geocode({ address: place.name }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            setInputValue(results[0].formatted_address);
            onPlaceSelect(results[0]);
          }
        });
      }
      onPlaceSelect(place);
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the input value when it changes
  };

  const handleClear = () => {
    setInputValue('');
    onClear?.();
  };

  return (
    <StyledInput
      {...inputProps}
      value={inputValue} // Make the OutlinedInput controlled
      onChange={handleChange}
      inputRef={inputRef}
      endAdornment={
        <InputAdornment position='end'>
          {Boolean(inputValue) ? (
            <IconButton onClick={handleClear} edge='end' sx={{ color: 'inherit', padding: 1 }}>
              <ClearIcon fontSize='small' />
            </IconButton>
          ) : null}
        </InputAdornment>
      }
    />
  );
}

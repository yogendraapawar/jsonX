import { RootState } from '@/redux/store';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

function PathList() {
  const keysPath: Array<string> = useSelector(
    (state: RootState) => state.keyPathSlice.path
  );
  return (
    <div >
      {keysPath.length === 0 ? (
        <div>Ohh!!! Come on, enter the key you want to find</div>
      ) : (
        <List spacing={3}>
          {keysPath.map((key, index) => (
            <ListItem key={index} fontSize={'12px'}>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {key}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default PathList;

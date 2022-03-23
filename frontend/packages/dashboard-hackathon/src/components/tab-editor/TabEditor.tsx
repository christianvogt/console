import * as React from 'react';
import {
  DragDrop,
  Droppable,
  DataList,
  Draggable,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  DataListControl,
  DataListDragButton,
  Button,
  Stack,
  StackItem,
  TextInput,
  Bullseye,
  InputGroup,
} from '@patternfly/react-core';
import TrashAltIcon from '@patternfly/react-icons/dist/esm/icons/trash-alt-icon';
import { DashboardTabConfig } from '../../types';
import { getRandomChars } from '../useDashboardAdd';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

type TabEditorProps = {
  tabs: DashboardTabConfig[];
  updateTabs: (dashboardTabs: DashboardTabConfig[]) => void;
};

const TabEditor: React.FC<TabEditorProps> = ({ tabs, updateTabs }) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <Button
          variant="secondary"
          onClick={() =>
            updateTabs([...tabs, { id: getRandomChars(), label: 'New Tab', layout: [], cards: [] }])
          }
        >
          Add Tab
        </Button>
      </StackItem>
      <StackItem>
        <DragDrop
          onDrop={(source, dest) => {
            if (dest) {
              const newItems = reorder(tabs, source.index, dest.index);
              updateTabs(newItems);
              return true;
            }
            return false;
          }}
        >
          <Droppable hasNoWrapper>
            <DataList aria-label="draggable data list example" isCompact>
              {tabs.map(({ id, label }) => (
                <Draggable key={id} hasNoWrapper>
                  <DataListItem aria-labelledby={id} ref={React.createRef()}>
                    <DataListItemRow>
                      <DataListControl>
                        <Bullseye>
                          <DataListDragButton />
                        </Bullseye>
                      </DataListControl>
                      <DataListItemCells
                        dataListCells={[
                          <DataListCell key={id}>
                            <InputGroup>
                              <TextInput
                                id={id}
                                value={label}
                                onChange={(newValue) => {
                                  updateTabs(
                                    tabs.map((tab) => {
                                      if (tab.id === id) {
                                        return {
                                          ...tab,
                                          label: newValue,
                                        };
                                      }
                                      return tab;
                                    }),
                                  );
                                }}
                              />
                              <Button
                                variant="control"
                                icon={<TrashAltIcon />}
                                onClick={() => {
                                  updateTabs(tabs.filter((tab) => tab.id !== id));
                                }}
                              />
                            </InputGroup>
                          </DataListCell>,
                        ]}
                      />
                    </DataListItemRow>
                  </DataListItem>
                </Draggable>
              ))}
            </DataList>
          </Droppable>
        </DragDrop>
      </StackItem>
    </Stack>
  );
};

export default TabEditor;

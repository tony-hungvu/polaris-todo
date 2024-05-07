import { ActionList, Icon, Text, TopBar } from '@shopify/polaris';
import { ArrowLeftIcon, QuestionCircleIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

const HeaderContent = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((prevState) => !prevState),
    []
  );
  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((prevState) => !prevState),
    []
  );
  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue('');
  }, []);
  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);
  const handleNavigationToggle = useCallback(() => {
    console.log('toggle navigation visibility');
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        { items: [{ content: 'Back to Shopify', icon: ArrowLeftIcon }] },
        { items: [{ content: 'Community forums' }] },
      ]}
      name='HungVM'
      detail='Vu Manh Hung'
      initials='HV'
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: 'Shopify help center' },
        { content: 'Community forums' },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder='Search'
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={QuestionCircleIcon} tone='base' />
          <Text as='span' visuallyHidden>
            Secondary menu
          </Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[{ items: [{ content: 'Community forums' }] }]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return topBarMarkup;
};

export default HeaderContent;

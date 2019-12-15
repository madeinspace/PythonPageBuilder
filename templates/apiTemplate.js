import { sqlConnection } from '../../utils/sql';
import { formatNumber } from '../../utils';
import Page from './page';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IGBMID } = filters;

  const tableData = await sqlConnection.raw(%(queryName)sSQL({ ClientID, WebID, IGBMID }));

  return tableData;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => '%(PageAlias)s under construction',
    },
    {
      Title: 'Headline',
      renderString: ({ data, tableData }): string =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
    },
    {
      Title: 'Description',
      renderString: ({ data, tableData }): string =>
        `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    },
  ],
  filterToggles: [
    // put toggle objects here
  ],
};

export { fetchData, Page, pageContent };

const %(queryName)sSQL = ({ ClientID, WebID, IGBMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_ERPPivot](${+ClientID},${+WebID},${+IGBMID}) ORDER BY Year DESC
`;

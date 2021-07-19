import * as modalsStyles from '../modalsStyles';
import { mockMatrix, mockLoadedIcons } from 'src/js/mockData/mockTheme';

describe('getModalsStyles', () => {
    it('should return correct object', () => {
        const mockArgs = {
            matrix: mockMatrix,
            loadedIcons: mockLoadedIcons,
        };
        const expected = {
            commonStyles: {
                wrapperBoxShadow: 'boxShadow_06',
            },
            loading: {
            accountWarning: {
                iconKYC: 'iconKYC',
                iconCross: 'iconCross',
                boxShadow: 'boxShadow_01',
                borderColor: 'color_04',
                iconOpenWallet: 'iconOpenWallet',
                firstTextColor: 'color_06',
                secondTextColor: 'color_05',
                buttonTextColor: 'color_09',
                iconLockedWallet: 'iconLockedWallet',
                iconIsSuspendedPair: 'iconIsSuspendedPair',
                buttonBackgroundColor: 'color_018',
                wrapperBackgroundColor: 'color_03',
            },
        };

        const actual = modalsStyles.getModalsStyles(mockArgs);

        assert.deepEqual(actual, expected);
    });
});

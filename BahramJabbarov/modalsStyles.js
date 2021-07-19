export const getModalsStyles = ({ matrix, loadedIcons }) => ({
    commonStyles: {
        wrapperBoxShadow: matrix.boxShadows.boxShadow_06,
    },
    accountWarning: {
        iconKYC: loadedIcons.themeIcons.iconKYC,
        iconCross: loadedIcons.commonIcons.iconCross,
        boxShadow: matrix.boxShadows.boxShadow_01,
        borderColor: matrix.colors.color_04,
        iconOpenWallet: loadedIcons.themeIcons.iconOpenWallet,
        firstTextColor: matrix.colors.color_06,
        secondTextColor: matrix.colors.color_05,
        buttonTextColor: matrix.colors.color_09,
        iconLockedWallet: loadedIcons.themeIcons.iconLockedWallet,
        iconIsSuspendedPair: loadedIcons.themeIcons.iconIsSuspendedPair,
        buttonBackgroundColor: matrix.colors.color_018,
        wrapperBackgroundColor: matrix.colors.color_03,
    },
});

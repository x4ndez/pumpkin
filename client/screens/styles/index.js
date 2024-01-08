import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    genericText: {
        color: '#E0E0E0',
    },
    subText: {
        color: '#757575',
    },
    h1: {
        fontSize: 24,
        marginBottom: 5,
    },
    h2: {
        fontSize: 16,
        marginBottom: 5,
    },
    h3Bold: {
        fontWeight: 'bold',
    },
    dayText: {
        color: 'white',
        margin: 5,
    },
    dayDateText: {
        marginLeft: 20,
    },
    classType: {
        fontSize: 12,
        backgroundColor: '#FFCC80',
        borderRadius: 5,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        color: '#424242',
    },
    container: {
        padding: 10,
        backgroundColor: '#212121',
        height: '100%'
    },
    dayContainer: {
        backgroundColor: '#424242',
        width: '100%',
        borderRadius: 5,
        paddingLeft: 10,
    },
    classContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#616161',
        borderBottomWidth: 0.5,
    },
    classMarker: {
        width: 8,
        height: '100%',
        backgroundColor: '#B2BABB',
        marginRight: 20,
        borderRadius: 5,
    },

    flexStartCenter: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    flexStartCenterRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    flexRow: {
        flexDirection: 'row',
    },
});

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
    h3: {
        marginBottom: 5,
    },
    featureHeading: {
        color: '#E0E0E0',
        backgroundColor: '#424242',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
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
    flexCenterCenterRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexRow: {
        flexDirection: 'row',
    },
    textInput: {
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 5,
        width: '40%',
    },
    wodContainer: {
        backgroundColor: 'red',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 5,
    },
    attendeeListContainer: {
        width: '100%',
        backgroundColor: '#292929',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    attendeeContainer: {
        // backgroundColor: 'red',
        paddingRight: 20,
        maxWidth: 70,
        // height: 80
    },
    attendeeListed: {
        height: 50,
        width: 50,
        backgroundColor: 'pink',
        borderRadius: 5,
        marginBottom: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
});

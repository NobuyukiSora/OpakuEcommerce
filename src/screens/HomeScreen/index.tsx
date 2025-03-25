import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import React, {useEffect, useMemo, useState} from 'react';
import {
  DrawerLayoutAndroid,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Metrics, Rating, themeColors, Typograph} from 'soras-ui';
import IconBurger from '../../assets/icons/Ico.Burger.svg';
import IconStar from '../../assets/icons/Ico.Star.svg';
import Navigator from '../../navigation/Navigator';
import i18n from '../../services/languageManagement/i18n';
import {useGetAllProductsQuery} from '../../services/redux/api';
import {formatCurrency} from '../../tools/currencyFormat';
import {createStyles} from './styles';

const HomeScreen = (drawer?: React.RefObject<DrawerLayoutAndroid | null>) => {
  const insets = useSafeAreaInsets();
  const {data, isLoading, refetch, error} = useGetAllProductsQuery();
  const [token, setToken] = useState<string | null>(null);

  const styles = useMemo(
    () => createStyles(Metrics, insets, themeColors),
    [Metrics, insets],
  );

  useEffect(() => {
    getToken();
    analytics().logScreenView({screen_name: 'HomeScreen'});
    if (!data) {
      refetch();
    }
  }, [data]);

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem('TOKEN');
    if (!storedToken) {
      Navigator.pureReset('Register');
    } else {
      setToken(storedToken);
    }
  };

  const viewProduct = async (item: any) => {
    await analytics().logEvent('view_product', {
      product_id: item.id,
      product_name: item.title,
    });
    Navigator.navigate('ProductDetail', item);
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => viewProduct(item)}
      key={item.id}>
      {item?.images[0] && (
        <Image
          source={{uri: item?.images[0]}}
          style={{
            height: Metrics[50] * 3,
            width: '100%',
            resizeMode: 'contain',
          }}
        />
      )}
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <Typograph customStyle={styles.productName}>{item?.title}</Typograph>
          <Typograph customStyle={styles.productPrice}>
            {formatCurrency('$', item?.price)}
          </Typograph>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: Metrics[12],
          }}>
          <Rating
            value={item?.rating}
            disable={true}
            customIconActive={
              <IconStar
                fill={Colors.green}
                stroke={Colors.green}
                width={24}
                height={24}
              />
            }
            customIconInactive={<IconStar fill="transparent" stroke="grey" />}
            height={Metrics[24]}
          />
          <Typograph>{item?.rating}</Typograph>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => drawer?.current?.openDrawer()}>
          <IconBurger stroke={themeColors.text} width={24} height={24} />
        </TouchableOpacity>
        <Typograph customStyle={styles.title}>{i18n.t('homeScreen.welcome')}</Typograph>
      </View>

      {error && <Typograph>{`${error}`}</Typograph>}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.products || []}
        keyExtractor={item => String(item?.id)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

export default HomeScreen;

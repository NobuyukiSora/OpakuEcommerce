import analytics from '@react-native-firebase/analytics';
import React, {useContext, useEffect, useMemo} from 'react';
import {FlatList, Image, TouchableOpacity, Vibration, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Metrics, themeColors, Typograph} from 'soras-ui';
import {DatabaseContext} from '../../services/sqlite/databaseContext';
import {createStyles} from './styles';
import {Product} from '../../services/sqlite/database';
import {formatCurrency} from '../../tools/currencyFormat';
import IconDelete from '../../assets/icons/Ico.Trash.svg';
import IconBack from '../../assets/icons/Ico.Back.svg';
import Navigator from '../../navigation/Navigator';

const CartScreen = () => {
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createStyles(Metrics, insets, themeColors),
    [themeColors],
  );
  const {refreshProduct, products, deleteProduct} =
    useContext(DatabaseContext)!;

  useEffect(() => {
    analytics().logScreenView({screen_name: 'CartScreen'});
    refreshProduct();
  }, []);

  const handleDeleteProduct = async (item: Product) => {
    await analytics().logEvent('delete_product_from_cart', {
      product_id: item?.id,
      product_name: item?.title,
    });
    deleteProduct(item?.id);
  };

  const renderProduct = ({item}: {item: Product}) => {
    console.log('item', item, item?.images);
    return (
      <View key={item?.id} style={styles.itemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.thumbnail}} height={100} width={100} />
          <View>
            <Typograph customStyle={styles.title}>{`${item?.title}`}</Typograph>
            <Typograph>{formatCurrency('$', item?.price)}</Typograph>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleDeleteProduct(item)}>
          <IconDelete stroke={themeColors.red} width={24} height={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Navigator.goBack()}
        style={{padding: Metrics[8]}}>
        <IconBack height={30} width={30} stroke={themeColors.text} />
      </TouchableOpacity>
      {products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item: Product) => item?.id}
          renderItem={renderProduct}
        />
      )}
    </View>
  );
};

export default CartScreen;

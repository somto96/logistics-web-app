import * as Yup from 'yup';
import dayjs from '../../dayjsLib'

export const packageDurationAndDescriptionSchema = Yup.object({
  pickUpDate: Yup.date()
    .required('Please enter the pickup date')
    .min(new Date(), 'Pickup date must be after or equal to today'),
  deliveryDate: Yup.date()
    .required('Please enter the delivery date')
    .min(new Date(), 'Delivery date must be after today')
    .test('not-same', 'Pickup and delivery dates cannot be the same', function (value) {
      const pickUpDate: string = this.resolve(Yup.ref('pickUpDate'));
      return !pickUpDate || !value || !dayjs(pickUpDate).isSameOrAfter(value, 'day');
    }),
});

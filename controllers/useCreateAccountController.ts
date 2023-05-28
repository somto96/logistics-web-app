import { useAppDispatch } from '../utils/hooks/useReduxHooks';
import { CreateAccount } from '../utils/types/onboarding';
import { useOnboardingState } from '../store/onboarding/slice';
import { POST_CREATE_ACCOUNTS_ACTION } from '../store/onboarding/actions';

export const useCreateAccountsController = () => {
  const dispatch = useAppDispatch();
  const onboardingState = useOnboardingState();

  //   Initial values
  const initialValueData = {
    contactFullName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
  };

  //Handler Functions
  const handleFormSubmit = async (values: CreateAccount) => {
    const payload: CreateAccount = {
        contactFullName: values.contactFullName,
        companyName: values.companyName,
        address: values.address,
        city: values.city,
        state: values.state,
        email: values.email,
        phoneNumber: values.phoneNumber,
    };
    dispatch(POST_CREATE_ACCOUNTS_ACTION(payload));
  };

  return {
    onboardingState,
    initialValueData,
    handleFormSubmit,
  };
};

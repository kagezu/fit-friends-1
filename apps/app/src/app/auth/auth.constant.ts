export enum UserMassage {
  NotFound = 'User not found',
  EmailExists = 'User with this email exists',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  AuthorizedUser = 'User is already logged in',
  NameNotValid = 'The name must be written in either Cyrillic or Latin.',
  BirthNotValid = 'The user date birth is not valid',
  ValueTooBig = 'Value is too big',
  ValueTooLittle = 'Value is too small',
  CertificateRequired = 'Certificate file is required',
}

export enum UserValidate {
  minLengthName = 1,
  maxLengthName = 15,
  minLengthPassword = 6,
  maxLengthPassword = 12,
  minLengthDescription = 10,
  maxLengthDescription = 140,
  minCaloriesToBurn = 1000,
  maxCaloriesToBurn = 5000,
  minCaloriesPerDay = 1000,
  maxCaloriesPerDay = 5000,
  minLengthMeritsOfCoach = 10,
  maxLengthMeritsOfCoach = 140,
}

export const MAX_TRAINING_TYPES = 3;
